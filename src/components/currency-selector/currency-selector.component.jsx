import './currency-selector.styles.scss';

const CurrencySelector = ({currencies, setter}) => {
    return <select className="currency-selector" onChange={(e) => setter(e.target.value)}>
        {Object.keys(currencies).map(key => {
            return <option value={key} key={key}>{currencies[key]}</option>;
        })}
    </select>;
}

export default CurrencySelector;
