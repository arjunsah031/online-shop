"use client"

import Header from "../(client)/components/header/header"
import Relative from "./com/relateive/relative"
import styles from './page.module.css';

import CodinInterview from "./com/codinginterview/codinginterview";



export default function Aboutpage () {

    function createMultiplier(multiplier) {
        return function (x) {
          return x * multiplier;
        };
        
      }
      const double = createMultiplier(2);
      
      
      console.log(double(5)); // 10
    
      

    return <>
        <Header/>
        <section className={styles.Con}>
            <Relative/>
        </section>
        <CodinInterview/>
    </>
}