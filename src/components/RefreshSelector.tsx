import React, { Dispatch, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthenticatedUser } from '../models/AuthenticatedUser';

interface Properties {
    authenticatedUser: AuthenticatedUser | null;
    updateRefresh: Dispatch<React.SetStateAction<number>>;
}

const rates: Array<number> = [0, 5, 10, 30];
const rateOptions: Record<number, string> = {};

export function RefreshSelector({ authenticatedUser, updateRefresh }: Properties) {
    const { t } = useTranslation();
    const [refresh, setRefresh] = useState<number>(authenticatedUser !== null ? authenticatedUser.refresh : 0);

    for (const rate of rates) {
        rateOptions[rate] = rate === 0 ? t('refresh_null') : t('refresh_value', { count: rate });
    }

    function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        event.preventDefault();
        const value: number = +event.currentTarget.value;
        if (authenticatedUser !== null && authenticatedUser.refresh !== value) {
            setRefresh(value);
            updateRefresh(value);
        }
    }

    return (
        <div className="row">
            <div className="col-12 text-right">
                <form>
                    <select onChange={onChange} value={refresh}>
                        {rates.map((value) => {
                            return (
                                <option key={'rate-' + value.toString()} value={value}>
                                    {rateOptions[value]}
                                </option>
                            );
                        })}
                    </select>
                </form>
            </div>
        </div>
    );
}
