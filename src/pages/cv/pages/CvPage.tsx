import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCandidateAPI, useTemplateAPI } from '../../../api';
import { Candidate, TemplateTree } from '../../../core/model';
import { CvBlockResolver } from '../components/CvBlockResolver';
import { StyledCvContainer } from '../../../styled';

export const CvPage: React.FC = () => {
  const candidateApi = useCandidateAPI();
  const templateApi = useTemplateAPI();
  const navigate = useNavigate();
  const { candidateId } = useParams();

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [templateTree, setTemplateTree] =
    useState<TemplateTree | null>(null);

  useEffect(() => {
    if (!candidateId) {
      navigate('/');
      return;
    }

    candidateApi.item.get(candidateId).then((candidateData) => {
      if (!candidateData.cvTemplateId) {
        navigate('/');
        return;
      }

      templateApi.item
        .get(candidateData.cvTemplateId)
        .then(({ json: templateJson }) => {
          const templateTreeInstance =
            TemplateTree.fromJSON(templateJson);
          templateTreeInstance.updateLeafsData(
            candidateData.dataFields,
          );

          setCandidate(candidateData);
          setTemplateTree(templateTreeInstance);
        });
    });
  }, []);

  const isReady = !!candidate && !!templateTree;

  return isReady ? (
    <StyledCvContainer>
      <CvBlockResolver block={templateTree!.rootBlock} />
    </StyledCvContainer>
  ) : null;
};
