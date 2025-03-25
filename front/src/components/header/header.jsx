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
      </nav>
    </header>
    </div>
  );
};

export default Header;