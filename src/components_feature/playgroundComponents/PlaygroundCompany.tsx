import {ReportDraft2} from '@/model/ReportDraft2'
import {useState , useEffect} from 'react'
import {CompanyKinds, companyKinds} from '../../anomalies/Anomaly'
import {_Company} from '../reportFlow/Company/Company'

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface PlaygroundCompanyProps {
  onCompanyKindChange: (companyKind: CompanyKinds) => void;
  initialCompanyKind?: CompanyKinds;
}

export const PlaygroundCompany = ({ onCompanyKindChange, initialCompanyKind = 'SIRET' }: PlaygroundCompanyProps) => {
  const storedCompanyKind = sessionStorage.getItem('selectedCompanyKind') || initialCompanyKind;
  const [companyKind, setCompanyKind] = useState<CompanyKinds>(storedCompanyKind as CompanyKinds);
  const [report, setReport] = useState<Partial<ReportDraft2>>({});

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    sessionStorage.setItem('selectedCompanyKind', companyKind);
    const newUrl = `${pathname}?testcase=company&companykind=${companyKind}`;
    history.pushState({}, '', newUrl);
    
    if (onCompanyKindChange) {
      onCompanyKindChange(companyKind);
    }
  }, [companyKind, pathname, onCompanyKindChange]);

  return (
    <>
      <div className="border border-dashed p-4 mb-8 bg-gray-100">
        <span>CompanyKind : </span>
        <select
          value={companyKind}
          onChange={e => setCompanyKind(e.target.value as CompanyKinds)}
          className="border border-solid border-black bg-white p-2 text-base"
        >
          {companyKinds.map(kind => (
            <option value={kind} key={kind}>
              {kind}
            </option>
          ))}
        </select>
      </div>

      <_Company
        draft={{
          companyKind,
        }}
        onUpdateReportDraft={x => setReport(x as Partial<ReportDraft2>)}
      />
      <pre className="text-gray-500 text-sm">{JSON.stringify(report, undefined, 2)}</pre>
    </>
  );
};
