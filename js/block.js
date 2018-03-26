class block {

    constractor(time, transactions, previousHASH, HASH) {
        this.time = time;
        this.transactions = transactions;
        this.previousHASH = previousHASH;
        this.nextHASH = '';
			this.HASH = HASH;

    }

}

var array1 = [1, 2, 3, 4];

array1.splice(2, 1);
