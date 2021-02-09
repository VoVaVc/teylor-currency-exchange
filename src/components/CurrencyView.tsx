import { Row, Col, DatePicker } from 'antd';
import { ReactElement, useEffect, useState } from 'react';

// tools
import { getCurrencyHistory } from 'src/api/Api';
import { ICurrencyHistory } from 'src/ui/IUiTypes';

// ui
import ExchangeHistory from 'src/ui/ExchangeHistory';
import { Moment } from 'moment';
import moment from 'moment';
const { RangePicker } = DatePicker;

function CurrencyView({ currencyCode, compareCurrencyCode, amount }): ReactElement {
  const [history, setHistory] = useState<ICurrencyHistory[]>([]);
  const [dateRange, setDateRange] = useState<Moment[]>([moment().subtract(1, 'month'), moment()]);

  const updateHistoryData = async () => {
    const resp = await getCurrencyHistory(currencyCode, compareCurrencyCode, dateRange[0], dateRange[1]);
    const mapped = Object.keys(resp.rates).map((key) => {
      return {
        date: key,
        value: resp.rates[key]![currencyCode] as number,
      }
    });
    setHistory(mapped);
  }

  useEffect(() => {
    updateHistoryData();
  }, [currencyCode, compareCurrencyCode, dateRange]);

  return (
    <div className="currency-view">
      <Row>
        <Col span={8}>
          <h2>{currencyCode} to {compareCurrencyCode}</h2>
        </Col>
        <Col span={16}>
          <RangePicker onChange={(value) => setDateRange(value as Moment[])}/>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <ExchangeHistory
            amount={amount}
            history={history}
          />
        </Col>
        <Col span={16}>

        </Col>
      </Row>
    </div>
  );
}

export default CurrencyView;
