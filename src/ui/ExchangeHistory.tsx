import { Table } from 'antd';
import { SortOrder } from 'antd/lib/table/interface';
import moment from 'moment';
import { translate } from 'react-i18nify';
import { useSelector } from 'react-redux';
import { IStore } from 'src/store/StoreTypes';

const getTime = (date: string): number => new Date(date).getTime();

export default function ExchangeHistory({ history }) {
  const columns = [{
    title: translate('date'),
    dataIndex: 'date',
    key: 'date',
    defaultSortOrder: 'descend' as SortOrder,
    render: (date) => moment(date).format('DD MMM YYYY'),
    sorter: {
      compare: (a, b) => getTime(a.date) - getTime(b.date)
    },
  }, {
    title: translate('exchange_rate'),
    dataIndex: 'value',
    key: 'value',
    render: (value) => (value * amount).toFixed(2),
    sorter: {
      compare: (a, b) => a.value - b.value,
    },
  }];

  const amount = useSelector((store: IStore) => store.amount);
  const sorted = history.sort((a, b) => getTime(b.date) - getTime(a.date));

  return (
    <Table columns={columns} dataSource={sorted} />
  )
}
