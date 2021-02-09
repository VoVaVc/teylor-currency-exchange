import { Layout, Row, Col, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { translate } from 'react-i18nify';

// ui
import CurrencyPicker from './ui/CurrencyPicker';
import ExchangeRates from './components/ExchangeRates';
import CurrencyView from './components/CurrencyView';

// tools
import { getCurrency } from './api/Api';
import { setCurrencies } from './store/Actions';

const { Header, Footer, Content } = Layout;

function App() {
  const [currency, setCurrency] = useState<string>('EUR');
  const [compareCurrency, setCompareCurrency] = useState<string>();
  const [amount, setAmount] = useState<number>(1);

  const dispatch = useDispatch();

  const loaded = async () => {
    const currencies = await getCurrency();
    dispatch(setCurrencies(Object.keys(currencies.rates)));
  }

  useEffect(() => {
    loaded();
  }, []);

  return (
    <Layout className="screen">
      <Header>
        <Row justify="space-between">
          <Col>
            <h1 className="h1">{translate('curency_exchange_rates')}</h1>
          </Col>
          <Col>
            <InputNumber
              min={1}
              value={amount}
              onChange={(value) => setAmount(Number(value))}
            />
            <CurrencyPicker
              onSelect={setCurrency}
              defaultValue={'EUR'}
            />
          </Col>
        </Row>

      </Header>
      <Content className="content">
        <Row>
          <Col span={8}>
            <ExchangeRates
              currency={currency}
              onSelect={setCompareCurrency}
              amount={amount}
            />
          </Col>

          <Col span={16}>
            {
              compareCurrency &&
              <CurrencyView
                amount={amount}
                currencyCode={currency}
                compareCurrencyCode={compareCurrency}
              />
            }
          </Col>
        </Row>
      </Content>
      <Footer>{translate('made_with_love')}</Footer>
    </Layout>
  );
}

export default App;
