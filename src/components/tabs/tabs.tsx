import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import type { ReduxStore } from '../../services/store.types';

type TTabsProps = {
  ingredientsTypes: string[];
};

export default function Tabs({ ingredientsTypes }: TTabsProps) {
  const { activeTab } = useSelector(
    (store: ReduxStore) => store.activeTab,
  );

  const onClick = (e: any) => {
    e.preventDefault();
  };

  return (
    <div style={{ display: 'flex', paddingBottom: '40px' }}>
      {ingredientsTypes.map((ingredientsType, index) => (
        <Tab
          value={ingredientsType}
          active={activeTab === ingredientsType}
          key={index}
          onClick={onClick}
        >
          {ingredientsType}
        </Tab>
      ))}
    </div>
  );
}
