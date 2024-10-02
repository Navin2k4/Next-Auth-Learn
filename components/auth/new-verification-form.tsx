"use client"

import { newVerification } from "@/actions/new-verification"
import { CardWrapper } from "./card-wrapper"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { BeatLoader } from 'react-spinners'
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"


export const NewVerificationForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const onSubmit = useCallback(() => {
        if (success || error) return;
        if (!token) {
            setError("Missing Token");
            return;
        }
        newVerification(token).then((data) => {
            setSuccess(data.success);
            setError(data.error);
        }).catch((error) => {
            setError("Something Went Wrong");
            setSuccess(undefined);
        });
    }, [token, success, error])

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);


    return (
        <CardWrapper
            headerLabel="Confirming your Verification"
            backButtonLabel="Back to Login"
            backbuttonHref="/auth/login"
        >
            <div className="flex items-center w-full justify-center">
                {!error && !success && (
                    <BeatLoader />
                )}
                <FormSuccess message={success} />
                {/* We will be having a Invalid token error even after the email is verified because in the development stage the react calls the useEffect hook two times because of the stricMode that runs the react but in the development mode it does not hapen so no need to worry about the error */}
                {!success && (
                    <FormError message={error} />
                )}
            </div>


        </CardWrapper>
    )
}
