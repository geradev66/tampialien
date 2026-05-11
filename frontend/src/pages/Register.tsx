import React from 'react'
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import { Link } from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {useState} from "react";

const Register = () => {
  const { register } = useAuth();
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    const res = await register({ nombre: form.nombre, email: form.email, password: form.password });
    if (res.success) {
      window.location.href = '/login';
    } else {
      alert(res.message || "Error al registrarse");
    }
  };

  return (
    <>
    <div className='flex flex-col md:flex-row gap-8 p-4 justify-center items-start mb-[22em]'>
        <div>
        <h2 className='text-white text-2xl'><i className="fa-solid fa-user text-[#39ff14]"></i> Registrate</h2>
        <Link to="/login" className='text-white'>¿Ya tienes una cuenta? <span className='text-[#39ff14]'>Inicia sesión aquí</span>.</Link>
        <Form className="mt-4" onSubmit={handleSubmit}>
          <TextField>
                <Label className="text-white">Nombre</Label>
                <Input type="text" name="nombre" placeholder="Tu nombre" value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})} />
                <Description>Por favor ingresa tu nombre.</Description>
                <FieldError>El nombre es requerido.</FieldError>
            </TextField>
            <TextField>
                <Label className="text-white">Correo electrónico</Label>
                <Input type="email" name="email" placeholder="Tu correo electrónico" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
                <Description>Por favor ingresa tu correo electrónico.</Description>
                <FieldError>El correo electrónico es requerido.</FieldError>
            </TextField>
            <TextField className="mt-4">
                <Label className="text-white">Contraseña</Label>
                <Input type="password" name="password" placeholder="Tu contraseña" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
                <Description>Por favor ingresa tu contraseña.</Description>
                <FieldError>La contraseña es requerida.</FieldError>
            </TextField>
            <TextField className="mt-4">
                <Label className="text-white">Confirmar contraseña</Label>
                <Input type="password" name="confirmPassword" placeholder="Confirma tu contraseña" value={form.confirmPassword} onChange={(e) => setForm({...form, confirmPassword: e.target.value})} />
                <Description>Por favor confirma tu contraseña.</Description>
                <FieldError>La confirmación de la contraseña es requerida.</FieldError>
            </TextField>
            <Button type="submit" className="mt-4 bg-[#39ff14] text-black hover:bg-[#32cd32]">Registrarse</Button>
        </Form>
        </div>
    </div>
      
    </>
  )
}

export default Register
