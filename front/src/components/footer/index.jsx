import React from "react";
import './styles.css'
import { Facebook, Instagram, Linkedin } from "lucide-react"


export default function Footer() {
    return (
        <main className="main">
            <div className="container_footer">
                <div className="footer-content">
                    <section className="school-info">
                        <h3>Escola SENAI Roberto Mange</h3>
                        <p>Formando profissionais para o futuro</p>
                        <p>Endereço: </p>
                    </section>
                </div>
            </div>
        </main>
    )
}