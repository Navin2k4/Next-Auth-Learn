import { CardWrapper } from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () =>{
    return (
        <CardWrapper 
            headerLabel="Oops! Something went wrong"
            backButtonLabel="Back to Login"
            backbuttonHref="/auth/login"
        >
            <div className="w-full items-center flex justify-center">

            <ExclamationTriangleIcon height={40} width={40} className="text-destructive" />
            </div>

        </CardWrapper>        
    ) 
}
