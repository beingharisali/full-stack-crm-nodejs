const Transaction = require("../model/transaction");

const createTransaction = async (req, res) => {
    try {
        const { propertyRef, client, agent, price, status } = req.body;

        const newTransaction = await Transaction.create({
            propertyRef,
            client,
            agent,
            price,
            status
        });

        res.status(201).json({
            success: true,
            message: "Transaction created successfully",
            data: newTransaction
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating transaction",
            error: error.message
        });
    }
};

const updateTransaction = async (req, res) => {
    try {
        const transactionId = req.params.id;

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            transactionId,
            req.body,
            { new: true }
        );

        if (!updatedTransaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Transaction updated successfully",
            data: updatedTransaction
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating transaction",
            error: error.message
        });
    }
};

module.exports = { updateTransaction, createTransaction };
