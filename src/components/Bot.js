import React from 'react';

const Bot = ({ active, text, placeholder, type, onSubmit, options }) => {
  const [value, setValue] = React.useState('');

  return (
    <div className={'bot' + (active ? ' bot--active' : '')}>
      <div className="bot__text" dangerouslySetInnerHTML={{ __html: text }}></div>
      {type === 'button' &&
        <button className="bot__button">{placeholder}</button>}
      {type === 'input' &&
        <input
          type="search"
          className="bot__input"
          placeholder={placeholder}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyUp={e => {
            if (e.keyCode === 13) {
              onSubmit(value);
            }
          }}
        />}
      {type === 'select' &&
        <div className="bot__select">
          {options && options.map(option => <div className="bot__select-option" key={option.name} onClick={() => onSubmit(option.name)}>{option.display}</div>)}
        </div>
      }
    </div>
  )
}

export default Bot;
