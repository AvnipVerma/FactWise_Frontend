import { useState } from 'react';

export const useAccordion = (initialIndex = null) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return { activeIndex, toggleAccordion };
};
