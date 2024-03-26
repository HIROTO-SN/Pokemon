import { createContext, useContext, useState } from "react";


const VersionLabel = createContext();
const SetVersionLabel = createContext();
const AbilityInfoShow = createContext();
const SetAbilityInfoShow = createContext();
const SelectedForm = createContext();
const SetSelectedForm = createContext();

	/*
 * DetailProvider
 * 1. Version情報
 * 2. Ability Info 開閉
 * 3. 
 */
export const DetailProvider = ({ children }) => {

	/*1*/
	// バージョンラベル（ボタン）
	const versionLabelInit = "x";
  const [versionLabel, setVersionLabel] = useState(versionLabelInit);

	/*2*/
	const abilityInfoShowInit = null;
	const [abilityInfoShow, setAbilityInfoShow] = useState(abilityInfoShowInit);

	/*3*/
	const formIdInit = 1;
	const [selectedForm, setSelectedForm] = useState(formIdInit);

	/***** Context ******/
  return (
    <VersionLabel.Provider value={versionLabel}>
    	<SetVersionLabel.Provider value={setVersionLabel}>
				<AbilityInfoShow.Provider value={abilityInfoShow}>
					<SetAbilityInfoShow.Provider value={setAbilityInfoShow}>
						<SelectedForm.Provider value={selectedForm}>
							<SetSelectedForm.Provider value={setSelectedForm}>
								{children}
							</SetSelectedForm.Provider>
						</SelectedForm.Provider>
					</SetAbilityInfoShow.Provider>
				</AbilityInfoShow.Provider>
			</SetVersionLabel.Provider>
		</VersionLabel.Provider>
	)
}

export const useVersionLabel = () => useContext(VersionLabel);
export const useSetVersionLabel = () => useContext(SetVersionLabel);
export const useAbilityInfoShow = () => useContext(AbilityInfoShow);
export const useSetAbilityInfoShow = () => useContext(SetAbilityInfoShow);
export const useSelectedForm = () => useContext(SelectedForm);
export const useSetSelectedForm = () => useContext(SetSelectedForm);