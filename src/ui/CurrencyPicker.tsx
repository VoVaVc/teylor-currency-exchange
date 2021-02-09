import { AutoComplete } from 'antd';
import { useSelector } from "react-redux";
import { IStore } from "src/store/StoreTypes";
import { translate } from 'react-i18nify';

export default function CurrencyPicker({ onSelect, defaultValue = 'EUR' }) {
  const currencies = useSelector((state: IStore) => state.currencies.map((currency: string) => { return { value: currency }}));

  return (
    <AutoComplete
      options={currencies}
      onSelect={onSelect}
      defaultValue={defaultValue}
      placeholder={translate('pick_currency')}
      style={{ width: 150 }}
    />
  )
}
