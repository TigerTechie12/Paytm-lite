import {Link} from "react-router-dom"
export function BottomWarning({label,buttonText,to}){
    return <div><div className="py-2 text-sm flex justify-center">
        {label}
    </div>
    <Link className="underline text-sm pointer cursor-pointer" to={to}>{buttonText}</Link></div>
}