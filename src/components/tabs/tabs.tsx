import { FC } from 'react';
import { useSelector } from 'react-redux';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import type { ReduxStore } from '../../services/store.types';

type TTabsProps = {
  ingredientsTypes: string[];
};

const Tabs: FC<TTabsProps> = ({ ingredientsTypes }) => {
  const { activeTab } = useSelector((store: ReduxStore) => store.activeTab);

  return (
    <div style={{ display: 'flex', paddingBottom: '40px' }}>
      {ingredientsTypes.map((ingredientsType, i) => (
        <Tab
          key={i}
          value={ingredientsType}
          active={activeTab === ingredientsType}
          onClick={() => false}>
          {ingredientsType}
        </Tab>
      ))}
    </div>
  );
};

export default Tabs;
