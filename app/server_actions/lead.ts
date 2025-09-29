import axios from "axios";

interface propertyFilter {
    projects: {
        errors: {
            code: string;
            message: string;
        }[];
        returnObjectId: number;
        successMessage: string;
    }[];
}

export const getLeads = async (token: string, search: string, page: number, size: number, userId: number, startDate: string, toDate: string, branchId: number, groupId: number, getAllRecord: boolean, projectId: number, developerBrandId: number, parentObjectId: number, searchFromFront: boolean, selectedMode: boolean, propertyFilter: any, favoriteMode: boolean) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/leads/search`,
        {
            search: search,
            page: {
                current: page,
                size: size
            },
            userId: userId,
            startDate: new Date(startDate).toISOString(),
            toDate: new Date(toDate).toISOString(),
            branchId: branchId,
            groupId: groupId,
            getAllRecord: true,
            projectId: projectId,
            developerBrandId: developerBrandId,
            parentObjectId: parentObjectId,
            searchFromFront: true,
            selectedMode: selectedMode,
            propertyFilter: {
                projects: [
                    {
                        errors: [
                            {
                                code: "",
                                message: ""
                            }
                        ],
                        returnObjectId: 0,
                        successMessage: "",
                        id: 0,
                        name: "",
                        createUser: "",
                        createDate: "2025-09-25T12:18:57.455Z",
                        updateUser: "",
                        updateDate: "2025-09-25T12:18:57.455Z",
                        thaiName: "",
                        address: "",
                        latitude: "",
                        longtitude: "",
                        petFriendly: true,
                        petLimit: 0,
                        isLeaseHold: true,
                        parkingSpace: 0,
                        fixParkingSpace: true,
                        buildYear: 0,
                        towerCount: 0,
                        totalRoom: 0,
                        maintainanceFee: 0,
                        singkingFund: 0,
                        place: "",
                        nearlyCondo: "",
                        maximumClass: 0,
                        developerBrand: {
                            errors: [
                                {
                                    code: "",
                                    message: ""
                                }
                            ],
                            returnObjectId: 0,
                            successMessage: "",
                            id: 0,
                            name: "",
                            createUser: "",
                            createDate: "2025-09-25T12:18:57.455Z",
                            updateUser: "",
                            updateDate: "2025-09-25T12:18:57.455Z",
                            thaiName: "",
                        },
                        towers: [
                            {
                                errors: [
                                    {
                                        code: "",
                                        message: ""
                                    }
                                ],
                                returnObjectId: 0,
                                successMessage: "",
                                id: 0,
                                name: "",
                                totalRoom: 0,
                                totalClass: 0,
                                projectId: 0
                            }
                        ],
                        pictures: [
                            {
                                errors: [
                                    {
                                        code: "",
                                        message: ""
                                    }
                                ],
                                returnObjectId: 0,
                                successMessage: "",
                                id: 0,
                                filename: "",
                                applicationType: "",
                                extension: "",
                                guId: "",
                                sourceType: "",
                                sourceId: 0,
                                fileSize: 0,
                                sortIndex: 0,
                                imageHeight: 0,
                                imageWidth: 0,
                                filePath: "",
                                url: "",
                                originalURL: "",
                                watermarkURL: "",
                                caption: "",
                            }
                        ],
                        overview: "",
                        projectView: 0,
                        website: "",
                        rentRoom: 0,
                        rentMinimum: 0,
                        saleRoom: 0,
                        saleMinimum: 0,
                        seo: {
                            title: "",
                            keyword: "",
                            description: "",
                            thaiTitle: "",
                            thaiDescription: "",
                            thaiKeyword: ""
                        },
                        ddpropertyId: "",
                        canonical: "",
                        facilities: [
                            {
                                id: 0,
                                name: "",
                                icon: "",
                                createUsername: "",
                                createDate: "2025-09-25T12:18:57.455Z",
                                updateUsername: "", 
                                updateDate: "2025-09-25T12:18:57.455Z",
                                facilityType: "Project",
                                forProject: true,
                                forProperty: true,
                                errors: [
                                    {
                                        code: "",
                                        message: ""
                                    }
                                ]
                            }
                        ],
                        vdoList: "",
                        projectType: {
                            errors: [
                                {
                                    code: "",
                                    message: ""
                                }
                            ],
                            returnObjectId: 0,
                            successMessage: "",
                            id: 0,
                            name: "",
                            createUser: "",
                            createDate: "2025-09-25T12:18:57.455Z",
                            updateUser: "",
                            updateDate: "2025-09-25T12:18:57.455Z",
                            thaiName: "",
                        },
                        baaniaId: "",
                        privateLift: true,
                        duplex: true,
                        proppitId: "",
                        rentMarketPrice: 0,
                        saleMarketPrice: 0,
                        areaId: 0,
                        areaShortName: "",
                        areaThaiShortName: "",
                        massTransitLineId: 0,
                        massTransitLineStationType: "",
                        nearStationId: 0,
                        airTableId: "",
                        disable: true,
                        subDistrictId: 0,
                        thaiAddress: "",
                        provinceId: 0,
                        districtId: 0,
                        thaiNearlyCondo: "",
                        thaiOverView: "",
                        juristicCompanyName: "",
                        juristicContactName: "",
                        juristicContactPosition: "",
                        juristicContactPhoneNumber: "",
                        parkingRemark: "",
                        subDistrictName: "",
                        provinceName: "",
                        districtName: "",
                        fullName: "",
                        seoID: 0
                    }
                ],
                unitTypes: [
                    {
                        errors: [
                            {
                                code: "",
                                message: ""
                            }
                        ],
                        returnObjectId: 0,
                        successMessage: "",
                        id: 0,
                        name: "",
                        createUser: "",
                        createDate: "2025-09-25T12:18:57.455Z",
                        updateUser: "",
                        updateDate: "2025-09-25T12:18:57.455Z",
                        thaiName: "",
                    }
                ],
                startSize: 0,
                toSize: 0,
                bedRoom: 0,
                bathRoom: 0,
                startRentalRateOnWeb: 0,
                toRentalRateOnWeb: 0,
                startRentalRatePerSQM: 0,
                toRentalRatePerSQM: 0,
                startSellingRateOnWeb: 0,
                toSellingRateOnWeb: 0,
                startSellingPerSQM: 0,
                toSellingPerSQM: 0,
                decorations: [
                    {
                        errors: [
                            {
                                code: "",
                                message: ""
                            }
                        ],
                        returnObjectId: 0,
                        successMessage: "",
                        id: 0,
                        name: "",
                        createUser: "",
                        createDate: "2025-09-25T12:18:57.455Z",
                        updateUser: "",
                        updateDate: "2025-09-25T12:18:57.455Z",
                        thaiName: "",
                    }
                ],
                pictureStatuses: [
                    {
                        errors: [
                            {
                                code: "",
                                message: ""
                            }
                        ],
                        returnObjectId: 0,
                        successMessage: "",
                        id: 0,
                        name: "",
                        createUser: "",
                        createDate: "2025-09-25T12:18:57.455Z",
                        updateUser: "",
                        updateDate: "2025-09-25T12:18:57.455Z",
                        thaiName: "",
                    }
                ],
                projectId: 0,
                unitTypeId: [],
                decorationId: [],
                pictureStatusId: [],
                projectName: search,
                permission: {
                    menuId: 0,
                    canCreate: true,
                    canView: true,
                    canUpdate: true,
                    canDelete: true,
                    canAssignContact: true,
                    requestProperty: true
                },
                propertyStatuses: [
                    {
                        errors: [
                            {
                                code: "",
                                message: ""
                            }
                        ],
                        returnObjectId: 0,
                        successMessage: "",
                        id: 0,
                        name: "",
                        createUser: "",
                        createDate: "2025-09-25T12:18:57.455Z",
                        updateUser: "",
                        updateDate: "2025-09-25T12:18:57.455Z",
                        thaiName: "",
                    }
                ],
                startFloor: 0,
                toFloor: 0,
                propertyStatusId: [],
                showOnWeb: 0,
                hotDeal: 0,
                picture: 0,
                forRentOrSale: 0,
                realwayStations: [
                    {
                        id: 0,
                        thaiName: "",
                        englishName: "",
                        latitude: "",
                        longtitude: "",
                        stationTypeValue: "",
                        stationType: "BTS",
                        updateUsername: "",
                        updateDate: "2025-09-25T12:18:57.455Z",
                        keywords: "",
                        massTransitLineId: 0
                    }
                ],
                realwayStationId: 0,
                startDistance: 0,
                toDistance: 0,
                forwardMKT: 0,
                petFriendly: 0,
                privateLift: 0,
                duplex: 0,
                penthouse: 0,
                fixParking: 0,
                projectTypes: [
                    {
                        errors: [
                            {
                                code: "",
                                message: ""
                            }
                        ],
                        returnObjectId: 0,
                        successMessage: "",
                        id: 0,
                        name: "",
                        createUser: "",
                        createDate: "2025-09-25T12:18:57.455Z",
                        updateUser: "",
                        updateDate: "2025-09-25T12:18:57.455Z",
                        thaiName: "",
                    }
                ],
                projectTypeId: [],
                boostedProppit: 0,
                assignedReportMode: true,
                vipStatuses: [
                    {
                        id: 0,
                        name: "",
                        color: "",
                        createDate: "2025-09-25T12:18:57.455Z",
                        updateName: "",
                    }
                ],
                vipStatus: [],
                propertyStatus: "",
                revealStatus: "",
                propertyStatusSingleId: 0,
                foreignerOwner: "",
                massTransitLineId: [],
            },
            projectSearch: {
                forRent: true,
                forSale: true,
                priceRange: "",
                roomType: "",
                projectName: search,
            },
            searchAllFilter: {
                projectName: search,
                type: "",
                roomType: "",
                priceRange: "",
                orderBy: "MostRelevant",
                bedroom: 0,
                bathroom: 0,
                projectTypeId: 0,
                roomSizeRange: "",
                petFriendly: true,
                privateLift: true,
                fixedParking: true,
                duplex: true,
                penthouse: true,
                projectId: 0,
                distanceMin: 0,
                distanceMax: 0,
                minPrice: 0,
                maxPrice: 0,
                rentBuy: "",
                propertyType: [],
                roomTypeList: [],
                roomSizeMin: 0,
                roomSizeMax: 0
            },
            backOfficeViewFilter: {
                searchType: 0,
                propertyId: 0,
                projectId: 0,
            },
            ipAddress: "",
            propertyBackOfficeSortType: "Project",
            sortBy: "ASC",
            leadFilter: {
                leadStatusId: 0,
                leadPurposeId: 0,
                ownerId: 0,
                leadSourceId: 0,
                clientType: 'Client',
                saleManagerId: 0,
                saleId: 0,
                projectName: search,
            },
            contactFormStatus: 0,
            currentLanguage: "",
            forRent: true,
            forSale: true,
            ids: [""],
            homeCategoryType: "PropertyType",
            saleId: 0,
            assignerId: 0,
            revealStatus: 0,
            viewMode: "",
            saleName: "",
            assignerName: "",
            massTransit: "",
            minBudget: 0,
            maxBudget: 0,
            assignContactReportSortBy: "Duration",
            dataEditReportSortBy: "RequestDate",
            roomType: "",
            projectDataEditReportSortBy: "RequestDate",
            invIDs: "",
            favoriteMode: favoriteMode
        },
        {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "accept": "application/json",
            },
        }
    );
    return response.data;
}

export const getLeadById = async (id: string, token: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/leads/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "accept": "application/json",
            "Content-Type": "application/json",
        },
    });
    return response.data;
}