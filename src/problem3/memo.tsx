const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();

    const getPriority = (blockchain: string): number => {
        switch (blockchain) {
        case 'Osmosis':
            return 100;
        case 'Ethereum':
            return 50;
        case 'Arbitrum':
            return 30;
        case 'Zilliqa':
        case 'Neo':
            return 20;
        default:
            return -99;
        }
    };

    const sortedBalances = useMemo(() => {
        return balances
            .filter((balance: WalletBalance) => balance.amount <= 0 || getPriority(balance.blockchain) > -99)
            .sort((lhs: WalletBalance, rhs: WalletBalance) => {
                const leftPriority = getPriority(lhs.blockchain);
                const rightPriority = getPriority(rhs.blockchain);
                return rightPriority - leftPriority;
            });
    }, [balances]);

    const rows = useMemo(() => {
        return sortedBalances.map((balance: WalletBalance, index: number) => {
            const usdValue = prices[balance.currency] * balance.amount;
            
            return (
                <WalletRow
                    className={classes.row}
                    key={index}
                    amount={balance.amount}
                    usdValue={usdValue}
                    formattedAmount={balance.amount.toFixed()}
                />
            );
        });
    }, [sortedBalances, prices]);

    return (
        <div {...rest}>
            {rows}
        </div>
    );
};
