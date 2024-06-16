const Balance = ({ account, balance }) => {
    return(
        <div style={{ display: 'flex', flexDirection: 'row',justifyContent:'space-between',alignItems:'center', height: '3rem', backgroundColor: '#57534e' }}>
        <p style={{color:'white' , marginLeft:'2rem',position:'relative',top:'5px'}}>Account: {account}</p>
        <p style={{color:'white', marginRight:'2rem',position:'relative',top:'5px'}}>Balance: {balance} ETH</p>
        </div>
    );
}
export default Balance