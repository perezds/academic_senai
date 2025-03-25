import React from 'react';

import './header.css'; 



const Header = () => {
  return (
    <div >
    <header className="header">
      <nav className="nav">
        <a href="/">Home</a>
        <a href="/home">Professores</a>
        <a href="/disciplinas">Disciplinas</a>
        <a href="/turmas">Turmas</a>
        <a href="/"></a>
        
      </nav>
    </header>
    </div>
  );
};

export default Header;