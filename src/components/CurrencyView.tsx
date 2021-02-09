import { Row, Col, DatePicker } from 'antd';
import { ReactElement, useEffect, useState } from 'react';
import { translate } from 'react-i18nify';
import { useSelector } from 'react-redux';
import { IStore } from 'src/store/StoreTypes';

// tools
import { getCurrencyHistory } from 'src/api/Api';
import { ICurrencyHistory } from 'src/ui/IUiTypes';

// ui
import ExchangeHistory from 'src/ui/ExchangeHistory';
import { Moment } from 'moment';
import moment from 'moment';
const { RangePicker } = DatePicker;

// charts
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function CurrencyView({ currencyCode, compareCurrencyCode }): ReactElement {
  const amount = useSelector((store: IStore) => store.amount);
  const [history, setHistory] = useState<ICurrencyHistory[]>([]);
  const [dateRange, setDateRange] = useState<Moment[]>([moment().subtract(1, 'month'), moment()]);
  const [chartSeries, setChartSeries] = useState<any>({
    type: 'line',
    data: []
  });
  const chartOptions: Highcharts.Options = {
    title: {
      text: translate('change_graph'),
    },
    xAxis: {
      type: "datetime",
    },
    legend: {
      enabled: false,
    },
    series: []
  };

  const updateChartValues = () => {
    setChartSeries({
      type: 'line',
      data: history.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((item) => {
        return {
          x: new Date(item.date),
          y: Number(item.value.toFixed(4)),
        };
      })
    })
  }

  const updateHistoryData = async () => {
    const resp = await getCurrencyHistory(currencyCode, compareCurrencyCode, dateRange[0], dateRange[1]);
    const mapped = Object.keys(resp.rates).map((key) => {
      return {
        date: key,
        value: resp.rates[key]![currencyCode] as number * amount,
      }
    });
    setHistory(mapped);
  }

  useEffect(() => {
    updateHistoryData();
  }, [currencyCode, compareCurrencyCode, dateRange]);

  useEffect(() => {
    // update values in chart if amount or history data is changed
    updateChartValues();
  }, [history, amount]);

  return (
    <div className="currency-view">
      <Row>
        <Col span={8}>
          <h2>{currencyCode} to {compareCurrencyCode}</h2>
        </Col>
        <Col span={16}>
          <RangePicker
            // @ts-ignore ts doesn't see the declaration properly
            defaultValue={...dateRange}
            onChange={(value) => setDateRange(value as Moment[])}
          />
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <div className="base-offset-right">
            <ExchangeHistory history={history} />
          </div>
        </Col>
        <Col span={16}>
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              ...chartOptions,
              series: chartSeries
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default CurrencyView;
