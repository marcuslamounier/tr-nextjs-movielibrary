import App from 'next/app'
import Footer from '../components/footer'
import Header from '../components/header'
import Navbar from '../components/navbar'
import '../styles/index.scss'

class MovieApp extends App {

  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext)
    return { ...appProps }
  }

  render() {

    const { Component, pageProps } = this.props

    return (

      <div>
        <Header/>
        <Navbar/>
        <div className="base-page">
          <div className="container">
            <div className="row">
                <Component {...pageProps} />
            </div>
          </div>
        </div>
        <Footer/>
      </div>

    )

  }

    
}

export default MovieApp