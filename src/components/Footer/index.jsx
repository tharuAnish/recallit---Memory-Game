import "./footer.style.css"

export default function Footer() {
  const date = new Date().getFullYear()

  return (
    <div className="footer">
      <hr className="hr" />
      <p className="footerText">
        Copyright ©{date} - www.recallit.com - All rights reserved
      </p>
    </div>
  )
}
