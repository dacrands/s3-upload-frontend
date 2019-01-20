import React from 'react'
import { navigate } from 'gatsby'

class Files extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            objects: []
        };
    }

    componentDidMount() {
        fetch('http://192.168.0.115:5000/files', {
            credentials: 'include'
        })
            .then(res => {
                if (res.status !== 200) {
                    throw (res)
                }
                // console.log(res.json())
                return res.json()
            })
            .then(response => {
                this.setState({ objects: response.objects })
                return
            })
            .catch(e => {
                console.error(e)
                return
            })
    }

    render() {
        return (
            <div>
                <header className="header">
                    <h1>Files</h1>
                </header>
                <div className="files">
                    {
                        this.state.objects[0]
                        ?
                        this.state.objects.map(obj => (
                            <div className="files__item" key={obj.link}>
                                <a href={obj.link}>
                                    {obj.name}
                                </a>                            
                            </div>
                        ))
                        :
                        null
                    }
                </div>
                
            </div>
        )
    }
}


export default Files