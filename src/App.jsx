import { useState, useEffect } from 'react'
import {nanoid} from 'nanoid'
import './App.css'
import mobileBackground from './assets/images/background-pattern-mobile.svg'
import tabletBackground from './assets/images/background-pattern-desktop.svg'

/* todo:
*   [x] create custom css variables
*   [x] set up custom font
*   [x] add reset.css file */

function App() {

  const [faqData, setFaqData] = useState([]);
  const [selectedFaq, setSelectedFaq] = useState(null);

  // console.log(selectedFaq);

  useEffect(() => {
    async function loadFaqData() {
      const response = await fetch('./faq.json');
      const data = await response.json();
      setFaqData(data.faq);
      console.log(data)
    }
    loadFaqData();
  },[]);

  function FaqListItem({faqData, setSelectedFaq}) {
    return faqData.map((faq, index)=>(
      <li key={nanoid()}>
        <input
          type="radio"
          id={`faq-${index}`}
          name="faq"
          value={faq.question}
          checked={selectedFaq === faq.question}
          onChange={(e) => setSelectedFaq(e.target.value)} />
        <label htmlFor={`faq-${index}`}>{faq.question}</label>
        {selectedFaq === faq.question && <p>{faq.answer}</p>}
      </li>
    ))
  }

  return (
    <>
      <div className="app-background">
        <picture>
          <source srcSet={tabletBackground} media="(min-width: 600px)"/>
          <img className="app-background__image" src={mobileBackground} alt=""/>
        </picture>
      </div>

      <main className="app">
        <section className="app__faq">
          <div className="app__faq-header">
            <img className="app__faq-header-icon" src="#" alt=""/>
            <h1 className="app__faq-header">FAQs</h1>
          </div>
          <ul className="app__faq-list">
            <FaqListItem
              faqData={faqData}
              setSelectedFaq={setSelectedFaq}
            />
          </ul>
        </section>

      </main>
    </>
  )
}

export default App
