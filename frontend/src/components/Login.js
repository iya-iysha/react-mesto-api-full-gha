import React from 'react';

export default function Login ({ onSubmit }) {
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
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input type="email" className="auth__input" placeholder="Email" onChange={handleChange} value={formData.email} name="email" required />
        <input type="password" className="auth__input" placeholder="Пароль" onChange={handleChange} value={formData.password} name="password" required />
        <button type="submit" className="auth__submit-btn">Войти</button>
      </form>
    </section>
  )
}