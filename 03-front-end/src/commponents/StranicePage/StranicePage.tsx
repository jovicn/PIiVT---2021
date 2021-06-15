import axios from "axios";
import React from "react";
import BasePage, { BasePageProperties } from "../BasePage/BasePage";
import StraniceModel from "../../../../02-back-end/src/components/stranica/model"

class StranicePageProperties extends BasePageProperties{
    naziv?: string = "";
    tekst?: string = "";
}

class StranicaPageState{
    naziv: string = "";
    tekst: string = "";
}

export default class StranicePage extends BasePage<StranicePageProperties>{
    state: StranicaPageState;

    constructor(props: StranicePageProperties){
        super(props);

        this.state={
            naziv: "",
            tekst: "",
        };
    }
    private getStranicaId(): number{
        const strid = this.props.match.params.strid;
        return  +(strid) ;
    }

    private getStranicaData(){
        const strId = this.getStranicaId();

        this.apiGetStranice(strId);

    }

    private apiGetStranice(strId: number){
        axios({
            method:"get",
            baseURL: "http://localhost:40080",
            url: "/stranica/" + strId,
            timeout: 10000,
            headers:{
                Authorization: "Bearer ..."
            },
            //withCredentials: true,
            maxRedirects: 0,
        })
        .then(res => {

            this.setState({
                naziv: res.data?.naziv,
                tekst: res.data?.tekst,
            })

        }).catch(err => {
            const errorMessage = "" + err;
            if(errorMessage .includes("404")){
                this.setState({
                    naziv: "Stranica nije pronadjena",
                    tekst: "",
                });
            }else{
                this.setState({
                    naziv: "Stranica ne moze da se ocita",
                    tekst: "",
                });
            }
        })
    }

    componentDidMount(){

    }

    commponentDidMount(prevProps: StranicePageProperties, prevState: StranicePage){

    }

    renderMain() {
        return(
            <>
             <h1>{ this.props.naziv ?? "Pravila"}</h1>
                <div>
                    <p>{this.props.tekst}</p>
                    
                </div>
            </>
        );
    }
}