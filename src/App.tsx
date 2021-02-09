import { Layout, Row, Col, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { translate } from 'react-i18nify';

// ui
import CurrencyPicker from './ui/CurrencyPicker';
import ExchangeRates from './components/ExchangeRates';
import CurrencyView from './components/CurrencyView';

// tools
import { getCurrency } from './api/Api';
import { setCurrencies, setAmount } from './store/Actions';
import { IStore } from './store/StoreTypes';

const { Header, Footer, Content } = Layout;

function App() {
  const [currency, setCurrency] = useState<string>('EUR');
  const [compareCurrency, setCompareCurrency] = useState<string>();
  const amount = useSelector((store: IStore) => store.amount);

  const dispatch = useDispatch();
  const setAmountState = (amount: number) => dispatch(setAmount(amount));

  const loaded = async () => {
    const currencies = await getCurrency();
    dispatch(setCurrencies(Object.keys(currencies.rates)));
  }

  useEffect(() => {
    loaded();
  }, []);

  return (
    <Layout>
      <Header>
        <Row justify="space-between">
          <Col>
            <h1 className="h1">{translate('curency_exchange_rates')}</h1>
          </Col>
          <Col>
            <InputNumber
              min={1}
              value={amount}
              onChange={(value) => setAmountState(Number(value))}
            />
            <CurrencyPicker
              onSelect={setCurrency}
              defaultValue={'EUR'}
            />
          </Col>
        </Row>

      </Header>
      <Content>
        <Row>
          <Col span={8}>
            <ExchangeRates
              currency={currency}
              onSelect={setCompareCurrency}
            />
          </Col>

          <Col span={16}>
            {
              compareCurrency &&
              <CurrencyView
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
