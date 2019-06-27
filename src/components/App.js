import React from 'react';
import Bot from './Bot';
import Header from './Header';
import Card from './Card';

const steps = [
  {
    text: "Hello, my name is <em>Timer</em> and I'll be your coach.<br /> What's your name?",
    type: 'input',
    placeholder: 'Your name',
    name: 'name',
    id: 0
  },
  {
    text: "Nice to meet you [name]! What do you want me to <em>help you</em> with?",
    type: 'select',
    options: [
      { 'name': 'drink', 'display': 'Drink more water' },
      { 'name': 'stretch', 'display': 'Stretch your back' },
    ],
    name: 'action',
    id: 1
  },
  {
    text: "[action] is important.<br />How often do you want me to remind you to do it?",
    type: 'select',
    options: [
      { 'name': 'drink', 'display': 'Every 30min' },
      { 'name': 'stretch', 'display': 'Every hour' },
      { 'name': 'stretch', 'display': 'Every 2 hours' },
      { 'name': 'stretch', 'display': 'Every 3 hours' },
      { 'name': 'stretch', 'display': 'Every 4 hours' },
      { 'name': 'stretch', 'display': 'Once a day' },
    ],
    name: 'frequency',
    id: 2
  },
  {
    text: "Ok, right! I guess that you sleep sometimes (I do).<br />When do you want me to begin and end my coaching?",
    type: 'input',
    placeholder: 'Range',
    name: 'range',
    id: 3
  },
  {
    text: "We're all setup! Now I will remember you to drink water every 30min from 8h to 17h.<br />The last thing you need to do is to allow notifications:",
    type: 'button',
    placeholder: 'Allow notifications',
    name: 'notifications',
    id: 4
  }
];

const App = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [variables, setVariables] = React.useState({});

  return (
    <div>
      <Header />
      <div className="container">
        <div className="bots-container">
          {Array(currentStep + 1).fill(0).map((step, index) => (
            <Bot
              key={steps[index].id}
              text={steps[index].text.split(' ').map((text) => {
                const isVar = text[0] === '[' && text.split(']')[0].indexOf(' ') === -1;
                if (isVar) {
                  const varName = text.split('[')[1].split(']')[0];
                  return text.replace('[' + varName + ']', variables[varName]);
                }
                return text;
              }).join(' ')}
              placeholder={steps[index].placeholder}
              active={index === currentStep}
              type={steps[index].type}
              options={steps[index].options}
              onSubmit={value => {
                setVariables({ ...variables, [steps[index].name]: value });
                setCurrentStep(currentStep + 1);
              }} />
          ))}
        </div>
      </div>
      <div className="cards-container">
        <Card />
      </div>
    </div>
  )
}

export default App;
