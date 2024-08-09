export default function UserProfile({params}: any){
    return(
        <div className="flex flex-col justify-center">
            <h2>User: {params.id}</h2>
        </div>
    )
}