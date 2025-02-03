export function Balance({value}){
    return <div className="flex">
        <div className="flex flex-col font-bold text-lg">Your Balance</div>
        <div className="flex ml-4 flex-col font-semibold text-lg">{value}</div>

    </div>
}