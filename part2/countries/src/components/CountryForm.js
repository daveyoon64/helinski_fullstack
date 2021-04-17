const CountryForm = ({value, linkHandler}) => {
  return (
    <form>
        find countries <input value={value} onChange={linkHandler}/>
    </form>
  )
}

export default CountryForm