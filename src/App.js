import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './i18n';

function App() {
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState('en');
    const [content, setContent] = useState('');
    const [texts, setTexts] = useState([]);

    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage);
        i18n.changeLanguage(selectedLanguage);
        fetchTexts(selectedLanguage);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/texts', { language, content })
            .then(response => {
                console.log(response.data);
                fetchTexts(language);
            })
            .catch(error => {
                console.error('There was an error saving the text!', error);
            });
    };

    const fetchTexts = (lang) => {
        axios.get(`http://localhost:3001/texts/${lang}`)
            .then(response => {
                setTexts(response.data.data);
            })
            .catch(error => {
                console.error('There was an error fetching the texts!', error);
            });
    };

    useEffect(() => {
        fetchTexts(language);
    }, [language]);

    return (
        <div className="App">
            <h1>{t('welcome')}</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    {t('selectLanguage')}:
                    <select value={language} onChange={handleLanguageChange}>
                        <option value="en">English</option>
                        <option value="kn">Kannada</option>
                        <option value="hi">Hindi</option>
                        <option value="ko">Korean</option>
                    </select>
                </label>
                <br />
                <label>
                    {t('enterText')}:
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                </label>
                <br />
                <button type="submit">{t('save')}</button>
            </form>
            <button onClick={() => fetchTexts(language)}>{t('fetchTexts')}</button>
            <ul>
                {texts.map((text, index) => (
                    <li key={index}>{text.content}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
