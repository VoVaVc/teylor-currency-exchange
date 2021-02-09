import { Select } from 'antd';
import { useSelector } from "react-redux";
import { IStore } from "src/store/StoreTypes";
import { translate } from 'react-i18nify';
const { Option } = Select;

export default function CurrencyFilter({ onChange }) {
  const currencies = useSelector((state: IStore) => state.currencies);

  return (
    <Select
      mode="multiple"
      allowClear
      style={{ width: '100%' }}
      placeholder={translate('filter_currencies')}
      onChange={onChange}
    >
      {
        currencies.map((currency) => <Option key={currency} value={currency}>{currency}</Option>)
      }
    </Select>
  )
}
