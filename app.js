document.addEventListener('DOMContentLoaded', () => {
    const data = {
      prenom: 'Lucille',
      nom: 'MINOT',
      poste: 'Porte-parole',
      tel: '06 01 02 03 04',
      email: 'lucille.minot@jeidf.cnje.org',
      r_sociaux: false,
    };
  
    const textFields = ['prenom', 'nom', 'poste', 'tel', 'email'];
    const checkboxFields = ['r_sociaux'];
  
    // Pré-remplissage et écoute des champs texte
    textFields.forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.value = data[id];
        input.addEventListener('input', e => {
          data[id] = e.target.value;
          updateSignature();
        });
      }
    });
  
    // Pré-remplissage et écoute des cases à cocher
    checkboxFields.forEach(id => {
      const checkbox = document.getElementById(id);
      if (checkbox) {
        checkbox.checked = data[id];
        checkbox.addEventListener('change', e => {
          data[id] = e.target.checked;
          updateSignature();
        });
      }
    });
  
    // Auto-formatage du numéro de téléphone (xx xx xx xx xx)
    const telInput = document.getElementById('tel');
    if (telInput) {
      telInput.addEventListener('input', e => {
        let raw = e.target.value.replace(/\D/g, '').substring(0, 10);
        let formatted = raw.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
        e.target.value = formatted;
        data.tel = formatted;
        updateSignature();
      });
    }
  
    // Mise à jour du contenu HTML de la signature
    function updateSignature() {
      const { prenom, nom, poste, tel, email, r_sociaux } = data;
  
	  const socialsHTML = r_sociaux ? `
	  <a href="https://join.slack.com/t/junior-entreprise-idf/shared_invite/zt-399qwyf46-dxoVwqvetovvC46FAvkzjA" target="_blank" rel="noopener">
		<img src="images/slack.png" alt="slack" style="width: 20px; height: 20px; margin-top: -5px;" />
	  </a>
	  <a href="https://www.linkedin.com/company/jeidf/" target="_blank" rel="noopener" style="margin-left: 8px;">
		<img src="images/linkedIn.png" alt="linkedIn" style="width: 20px; height: 20px; margin-top: -5px;" />
	  </a>
	  <a href="https://www.instagram.com/junior_entreprises_idf/" target="_blank" rel="noopener" style="margin-left: 8px;">
		<img src="images/instagram.png" alt="instagram" style="width: 20px; height: 20px; margin-top: -5px;" />
	  </a>
	` : '';
	
  
      // Extra block contient les réseaux sociaux s'ils sont cochés
      const extraBlock = r_sociaux
        ? `<p style="margin: 8px 0 0 0;">${socialsHTML}</p>`
        : '';
  
      const signatureHTML = `
        <p style="margin: 0;">
          <span style="color: #495053; font-weight: bold">
            ${prenom} ${nom}
          </span><br />
		<span style="color: #495053; display: inline-block; margin-top: 5px;">
            ${poste} - Île de France
          </span><br />
          <span style="color: #6d7a80; display: inline-block; margin-top: 10px;">
            Téléphone : ${tel}
          </span><br />
          <a href="mailto:${email}" style="color: #6d7a80; text-decoration: none;" target="_blank" rel="noopener">
            Email : <span style="color: #ba1449; display: inline-block; margin-top: 5px;"">${email}</span>
          </a>
        </p>
        ${extraBlock}
      `;
  
      const signatureContainer = document.getElementById('signature-content');
      if (signatureContainer) {
        signatureContainer.innerHTML = signatureHTML;
      }
    }
  
    // Bouton de sélection de la signature dans le presse-papiers
    const selectButton = document.getElementById('select-signature');
    if (selectButton) {
      selectButton.addEventListener('click', () => {
        const target = document.getElementById('signature-JEIDF');
        if (!target) return;
  
        if (window.getSelection && document.createRange) {
          const range = document.createRange();
          range.selectNodeContents(target);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
        } else if (document.body.createTextRange) {
          const range = document.body.createTextRange();
          range.moveToElementText(target);
          range.select();
        }
      });
    }
  
    // Initialisation : mise à jour à l’ouverture
    updateSignature();
  });
  