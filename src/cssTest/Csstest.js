import React from 'react'

function Csstest(){
    return(
        <body>
            <header id="mainHeader">
            <nav>header/nav</nav>
            <h1>HTML</h1>
            </header>

            <section id="abou_us">
                <header>
                    <h2>header2</h2>
                </header>
            </section>

            <section className="content">
                <div>
                    <header>
                        <p className="section-intro">header3</p>
                    </header>
                </div>
            </section>

            <section id="our_people" className="our_people">
                <header>
                    <h2>header안의 h2태그</h2>
                    <nav>header안의 nav태그</nav>
                </header>
            </section>

            <section className="content2">
                <article id="alastair_grigor">
                    <figure><img src="images/pic1.jpg" alt="pic1"></img></figure>
                </article>
            </section>

            <footer className="mainFooter">
                <address>Oppyright (C) designdigit All Right Reserved.</address>
            </footer>
        </body>
    )
}

export default Csstest