import { Routes, Route, Link } from 'react-router-dom';

export default function Header({ logo, email, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
      <Routes>
        <Route path="/" element={
          <div className="header__logged-in" >
            <p className="header__username">{email}</p>
            <Link to="/sign-in" className="header__link header__link_type_log-out" onClick={onSignOut} >Выйти</Link>
          </div>
        } />
        <Route path="/sign-up" element={
          <Link to="/sign-in" className="header__link">Войти</Link>
        } />
        <Route path="sign-in" element={
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        } />
      </Routes>
    </header>
  )
}