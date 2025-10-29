1- use "git pull origin main" command to get pull of recent code done by "beingharisali".
2- In earlier commit of "shahzaib-dev79", there was issue in server start, because "require" spell was incorrect.
3- the database connection code was incorrect as there was multiple promises (first used trycatch block, then in that block, used .then promise)
it's a bad approach. Sorted that part as well