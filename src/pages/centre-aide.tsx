import {Tab, Tabs} from '@mui/material'
import {pageDefinitions} from 'core/pageDefinition'
import {CentreAideConso} from 'feature/CentreAide/CentreAideConso'
import {CentreAidePro} from 'feature/CentreAide/CentreAidePro'
import Head from 'next/head'
import {useState} from 'react'
import {Page} from 'shared/Page/Page'

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const CentreAide = () => {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <Page size="small" className="blog">
      <Head>
        <title>{pageDefinitions.centreAide.title}</title>
        <meta name="description" content={pageDefinitions.centreAide.description} />
      </Head>
      <h1>Centre d'aide</h1>
      <Tabs
        value={activeTab}
        onChange={(e, i) => setActiveTab(i)}
        sx={{
          borderRadius: t => t.shape.borderRadius,
          border: t => `1px solid ${t.palette.divider}`,
        }}
      >
        <Tab sx={{flex: 1}} label="Consommateur" {...a11yProps(0)} />
        <Tab sx={{flex: 1}} label="Professionnel" {...a11yProps(1)} />
      </Tabs>
      {activeTab === 0 ? <CentreAideConso role="tabpanel" /> : <CentreAidePro role="tabpanel" />}
    </Page>
  )
}

export default CentreAide
