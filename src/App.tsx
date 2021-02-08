import './App.css';
import { Layout } from 'antd';
// import { translate } from 'react-i18nify';

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header>Header</Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
