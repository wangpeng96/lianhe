import Center from '../Center/index';
import Left from '../Left/index';
import Right from '../Right/index';
import Time from '../Time/index';
import './index.less';

const HomePage: React.FC = () => {
  return (
    <div>
      <header>
        <span className="topLeft">杭州-多云-34℃</span>
        <h2>2020年全国GDP统计</h2>
        <span className="topRight">
          <Time></Time>
        </span>
      </header>
      <main>
        <Left></Left>
        <Center></Center>
        <Right></Right>
      </main>
    </div>
  );
};

export default HomePage;
