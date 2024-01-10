import { useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'
import Filters from './Filters'

const TabView = () => {
  const tabStyle = {
    _selected: { color: 'brand' },
    color: '#939393',
    fontSize: '0.875rem',
    fontWeight: '600',
  }

  return (
    <>
      <Tabs width={'100%'} variant={'line'} mt={8}>
        <TabList>
          <Tab {...tabStyle}>Question</Tab>
          <Tab {...tabStyle}>Participants</Tab>
        </TabList>
        <TabIndicator mt='-1.5px' height='2px' bg='brand' borderRadius='1px' />
        <TabPanels>
          <TabPanel>
            <Filters SelectFilter />
          </TabPanel>
          <TabPanel>
            <Filters SearchBox />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default TabView
