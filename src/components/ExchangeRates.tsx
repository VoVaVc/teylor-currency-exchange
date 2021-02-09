import { Table, Card } from 'antd';
import { useEffect, useState } from 'react';
import { translate } from 'react-i18nify';
import { SortOrder } from 'antd/lib/table/interface';

import { getCurrency } from '../api/Api';
import CurrencyFilter from '../ui/CurrencyFilter';
import { useSelector } from 'react-redux';
import { IStore } from 'src/store/StoreTypes';

interface ICurrencyTable {
  name: string;
  value: number;
}

export default function ExchangeRates({ currency, onSelect }) {
  const [data, setData] = useState<ICurrencyTable[]>([]);
  const [filtered, setFiltered] = useState<string[]>([]);
  const amount = useSelector((store: IStore) => store.amount);

  const columns = [{
    title: translate('currency'),
    dataIndex: 'name',
    key: 'name',
    defaultSortOrder: 'ascend' as SortOrder
  }, {
    title: translate('exchange_rate'),
    dataIndex: 'value',
    key: 'value',
    render: (value) => (value * amount).toFixed(2)
  }];

  const updateCurrencyData = async () => {
    const resp = await getCurrency(currency);
    const mapped = Object.keys(resp.rates).map((currencyName) => {
      return {
        name: currencyName,
        value: resp.rates[currencyName] as number,
      }
    });
    setData(mapped);
  }

  useEffect(() => {
    updateCurrencyData()
  }, [currency]);

  const provideExchangeData = (): ICurrencyTable[] => {
    return filtered.length ? data.filter(({ name }) => filtered.includes(name)) : data;
  }

  return (
    <Card
      title={<CurrencyFilter onChange={setFiltered}/>}
    >
      <Table
        columns={columns}
        dataSource={provideExchangeData()}
        onRow={(record) => {
          return {
            onClick: () => onSelect(record.name)
          }
        }}
      />
    </Card>
  )
}
