import { Table, Card } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { translate } from 'react-i18nify';
import { SortOrder } from 'antd/lib/table/interface';

import { getCurrency } from '../api/Api';
import CurrencyFilter from '../ui/CurrencyFilter';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from 'src/store/StoreTypes';
import { removeFavorite, setFavorite } from '../store/Actions';

interface ICurrencyTable {
  name: string;
  value: number;
}

export default function ExchangeRates({ currency, onSelect }) {
  const [data, setData] = useState<ICurrencyTable[]>([]);
  const [filtered, setFiltered] = useState<string[]>([]);
  const { amount, favorites } = useSelector((store: IStore) => store);
  const dispatch = useDispatch();

  const addRemoveFavorite = (evt, name, add: boolean = true) => {
    const func = add ? setFavorite : removeFavorite
    dispatch(func(name));

    // prevent currency view from opening
    evt.stopPropagation();
  }

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
  }, {
    key: 'favorite',
    // @ts-ignore no need for text value to be used
    render: (text, record: ICurrencyTable) => (
      favorites.includes(record.name) ? (
        <StarFilled onClick={(evt) => {
          console.log('removing')
          addRemoveFavorite(evt, record.name, false);
        }}/>
      ) : (
        <StarOutlined onClick={(evt) => {
          addRemoveFavorite(evt, record.name);
        }}/>
      )
    )
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
    return (filtered.length ? data.filter(({ name }) => filtered.includes(name)) : data)
      .filter(({ name }) => name !== currency) // hide active currency to avoid collision
      .sort((a, b) => a.name.localeCompare(b.name)) // sort alphabeticaly
      .sort((a, b) => favorites.includes(b.name) ? 1 : 0 - (favorites.includes(a.name) ? 1 : 0)) // push favorites on top
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
