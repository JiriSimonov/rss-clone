type Callback<F extends (...args: Parameters<F>) => void> = (...args: Parameters<F>) => void;
