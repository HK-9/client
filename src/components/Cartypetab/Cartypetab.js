import './cartypetab.css';
import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

function Cartypetab() {
    
  return (
        
   <div className="Appp">
     <Tabs className="Tabs">
       <TabList>
        
         <Tab>SUV</Tab>
         <Tab>MUV</Tab>
         <Tab>Sedan</Tab>
         <Tab>Hatch</Tab>
       </TabList>
{/* <TabPanel>
         <p>Tab 1 works!</p>
       </TabPanel>
       <TabPanel>
         <p>Tab 2 works!</p>
       </TabPanel>
       <TabPanel>
         <p>Tab 3 works!</p>
       </TabPanel> */}
     </Tabs>
   </div>
  )
}

export default Cartypetab
