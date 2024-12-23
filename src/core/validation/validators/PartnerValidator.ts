import { CreateEdfiVendorRequest } from "../../../services/AdminActions/Edfi/Vendors/EdfiVendorsService.requests";
import { FieldError, FormDataErrors, ValidateFieldParams } from "../FormValidations.types";
import partnerNameSchema from "../schemas/Partners/nameSchema";
import namespacePrefixesSchema from "../schemas/Partners/namespacePrefixesSchema";
import ValidationErrorsMapper from "./ValidationErrorsMapper";

export type PartnerValidatorFields = "partnerName" | "namespacePrefixes"

export class PartnerValidator {
    public static validateField({ data, field }: ValidateFieldParams<CreateEdfiVendorRequest, PartnerValidatorFields>): FieldError | null {
        if (field === "partnerName")
            return this.validateName(data.contactName)
        else if (field === 'namespacePrefixes')
            return this.validateNamespacePrefixes(data.namespacePrefixes)

        return null
    }

    public static validateAll() : FormDataErrors | null {
        return {
            'field': { message: "" }
        }
    }

    private static validateName(value: string): FieldError | null {
        const { error } = partnerNameSchema.validate(value)

        return ValidationErrorsMapper.map(error)
    }

    private static validateNamespacePrefixes(value: any) : FieldError | null {
        const { error } = namespacePrefixesSchema.validate(value)

        if (error)
            return ValidationErrorsMapper.map(error)

        return this.validateNamespacePrefixUrl(value)
    }

    private static validateNamespacePrefixUrl(value: string) : FieldError | null
    {
        if (value.length == 0)
            return null

        const urlsList = value.split(",")

        for (const url of urlsList) {
            if (!this.isValidUrl(url))
                return { message: `Invalid url: ${url}` }
        }

        return null
    }

    private static isValidUrl (value: string): boolean {
        const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;

        const localhostDomainRE = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/
        const nonLocalhostDomainRE = /^[^\s\.]+\.\S{2,}$/;

        if (typeof value !== 'string') {
          return false;
        }
      
        var match = value.match(protocolAndDomainRE);
        if (!match) {
          return false;
        }
      
        var everythingAfterProtocol = match[1];
        if (!everythingAfterProtocol) {
          return false;
        }
      
        if (localhostDomainRE.test(everythingAfterProtocol) ||
            nonLocalhostDomainRE.test(everythingAfterProtocol)) {
          return true;
        }
      
        return false;
    }
}