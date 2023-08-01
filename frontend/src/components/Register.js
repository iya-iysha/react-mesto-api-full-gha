import React from 'react';
import { Link } from 'react-router-dom';

export default function Register ({ onSubmit }) {
  const [formData, setFormData] = React.useState({
    password: '',
    email: ''
  })

  function handleChange (e) {
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value
    })
  }

  function handleSubmit (e) {
    e.preventDefault();
    onSubmit({
      password: formData.password,
      email: formData.email
    })
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input type="email" className="auth__input" onChange={handleChange} value={formData.email} placeholder="Email" name="email" required />
        <input type="password" className="auth__input" onChange={handleChange} value={formData.password} placeholder="Пароль" name="password" required />
        <button type="submit" className="auth__submit-btn">Зарегистрироваться</button>
      </form>
      <Link to="/sign-in" className="auth__link">Уже зарегистрированы? Войти</Link>
    </section>
  )
}